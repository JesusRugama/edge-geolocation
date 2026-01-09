terraform {
  backend "s3" {
    bucket         = "jesusrugama.terraform"
    key            = "jesusrugama-infrastructure/demos/edge-geolocation/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "jesusrugama.terraform-locks"
    encrypt        = true
  }
}