data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com", "edgelambda.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_edge" {
  name               = "edge-geolocation-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_edge.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "edge" {
  provider      = aws.us_east_1
  function_name = "edge-geolocation"
  role          = aws_iam_role.lambda_edge.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  s3_bucket     = aws_s3_bucket.main.id
  s3_key        = "lambda/edge-geolocation.zip"
  publish       = true

  lifecycle {
    ignore_changes = [s3_bucket, s3_key, source_code_hash]
  }
}

variable "lambda_version" {
  description = "The published version of the Lambda function to use"
  type        = string
  default     = "1"
}
