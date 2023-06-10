resource "random_uuid" "id" {
}
resource "aws_dynamodb_table" "table" {
    name           = random_uuid.id.result
    hash_key       = var.key
    attribute {
        name = var.key
        type = "S"
    }
    billing_mode   = "PAY_PER_REQUEST"
}