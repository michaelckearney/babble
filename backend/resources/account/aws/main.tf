# https://github.com/jetbrains-infra/terraform-aws-cognito-google-oauth-with-custom-domain/blob/master/cognito.tf
# https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateIdentityProvider.html#API_CreateIdentityProvider_RequestSyntax
# https://github.com/mineiros-io/terraform-aws-cognito-user-pool/blob/master/main.tf


resource "random_uuid" "id" {
}
resource "aws_cognito_user_pool" "pool" {
    name = random_uuid.id.result
}
resource "aws_cognito_identity_provider" "google" {
    user_pool_id = aws_cognito_user_pool.pool.id
    provider_name = "Google"
    provider_type = "Google"
    provider_details = {
        client_id = ""
        client_secret = ""
        authorize_scopes = "email profile openid"
    }
}