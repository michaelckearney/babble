resource "aws_s3_bucket" "bucket" {
    force_destroy = true
    bucket_prefix = "babble"
}