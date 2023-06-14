terraform {
}

locals {
}

resource "random_uuid" "id" {
}

resource "aws_iam_role" "layer" {
    name = "${random_uuid.id.result}-layer"
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
        {
            Effect = "Allow",
            Principal = {
                Service = "lambda.amazonaws.com"
            },
            Action = "sts:AssumeRole"
        }
        ]
    })
}
resource "aws_iam_policy" "layer" {
    name = "${random_uuid.id.result}-layer"
    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Effect   = "Allow",
                Action   = "*",
                Resource = "*"
            }
        ]
    })
}
resource "aws_iam_role_policy_attachment" "layer" {
    role = aws_iam_role.layer.name
    policy_arn = aws_iam_policy.layer.arn
}
resource "aws_lambda_function" "layer" {
    function_name = "${random_uuid.id.result}-layer"
    role = aws_iam_role.layer.arn
    handler = "main.handler"
    runtime = "python3.9"
    memory_size = 128
    timeout = 900
    source_code_hash = data.archive_file.layer.output_base64sha256
    filename = "${path.module}/layer.zip"
}
resource "aws_s3_bucket" "layer" {
    bucket_prefix = "babble"
    force_destroy = true
}
resource "aws_lambda_invocation" "layer" {
    function_name = aws_lambda_function.layer.function_name
    input = local.lambda_input
}
resource "aws_lambda_layer_version" "layer" {
    layer_name = "${random_uuid.id.result}-layer"
    s3_bucket = aws_s3_bucket.layer.id
    s3_key = "layer.zip"
    compatible_runtimes = [
        "python3.9"
    ]
    depends_on = [
        aws_lambda_invocation.layer
    ]
}

resource "aws_iam_role" "main" {
    name = "${random_uuid.id.result}-main"
    assume_role_policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Effect = "Allow",
                Principal = {
                    Service = "lambda.amazonaws.com"
                },
                Action = "sts:AssumeRole"
            }
        ]
    })
}
resource "aws_iam_policy" "main" {
    name = "${random_uuid.id.result}-main"
    policy = jsonencode({
        Version = "2012-10-17",
        Statement = [
            {
                Effect   = "Allow",
                Action   = "*",
                Resource = "*"
            }
        ]
    })
}
resource "aws_iam_role_policy_attachment" "main" {
    role = aws_iam_role.main.name
    policy_arn = aws_iam_policy.main.arn
}
resource "aws_lambda_function" "main" {
    function_name = "${random_uuid.id.result}-main"
    role = aws_iam_role.main.arn
    handler = "main.handler"
    runtime = "python3.9"
    memory_size = 128
    timeout = 900
    source_code_hash = data.archive_file.main.output_base64sha256
    filename = "${path.module}/main.zip"
    layers = [
        aws_lambda_layer_version.layer.arn
    ]
}
resource "aws_api_gateway_rest_api" "main" {
    name = random_uuid.id.result
    body = local.api_input
}
resource "aws_api_gateway_deployment" "main" {
    rest_api_id = aws_api_gateway_rest_api.main.id
    stage_name = "api"
    triggers = {
        redeployment = sha1(local.api_input)
    }
}
resource "aws_lambda_permission" "main" {
    statement_id = "${random_uuid.id.result}-apigateway"
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.main.function_name
    principal = "apigateway.amazonaws.com"
    source_arn = "${aws_api_gateway_rest_api.main.execution_arn}/*/*"
}
resource "local_file" "url" {
    filename = "${path.module}/url.txt"
    content = aws_api_gateway_deployment.main.invoke_url
}


resource "aws_cloudwatch_event_rule" "routines" {
    for_each = local.routines
    name = "${random_uuid.id.result}-${each.key}"
    schedule_expression = "${each.value.cron}"
}
resource "aws_cloudwatch_event_target" "routines" {
    for_each = local.routines
    rule = "${random_uuid.id.result}-${each.key}"
    arn = aws_lambda_function.main.arn
    target_id = each.key
    input = jsonencode({
        type = "routine"
        routine = each.key
        cron = each.value.cron
    })
    depends_on = [
        aws_cloudwatch_event_rule.routines
    ]
}
resource "aws_lambda_permission" "routine" {
    statement_id = "${random_uuid.id.result}-cloudwatch"
    action = "lambda:InvokeFunction"
    function_name = aws_lambda_function.main.function_name
    principal = "events.amazonaws.com"
}
