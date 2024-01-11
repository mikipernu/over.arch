terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  profile = "default"
}

resource "aws_instance" "ec2" {
    ami                                  = var.ec2_ami
    availability_zone                    = var.availability_zone
    instance_type                        = "t3.micro"
    security_groups                      = [
        var.ec2_sg_name,
    ]
    subnet_id                            = var.ec2_subnet
    tags                                 = {
        "Name" = var.chat_tag
    }
}

resource "aws_cognito_user_pool" "user_pool" {
    deletion_protection       = "ACTIVE"
    name                      = var.user_pool_name
    tags                      = {
      "Name" = var.chat_tag
    }
    username_attributes       = [
        "email",
    ]

    account_recovery_setting {
        recovery_mechanism {
            name     = "verified_email"
            priority = 1
        }
    }

    admin_create_user_config {
        allow_admin_create_user_only = true
    }

    email_configuration {
        reply_to_email_address = var.identity
        source_arn             = "arn:aws:ses:${var.region}:${var.account}:identity/${var.identity}"
    }

    password_policy {
        minimum_length                   = 8
        require_lowercase                = true
        require_numbers                  = true
        require_symbols                  = false
        require_uppercase                = true
        temporary_password_validity_days = 7
    }

    schema {
        attribute_data_type      = "String"
        developer_only_attribute = false
        mutable                  = true
        name                     = "email"
        required                 = true

        string_attribute_constraints {
            max_length = "2048"
            min_length = "0"
        }
    }
    schema {
        attribute_data_type      = "String"
        mutable                  = true
        name                     = "username"

        string_attribute_constraints {
            max_length = "20"
            min_length = "4"
        }
    }

    username_configuration {
        case_sensitive = false
    }

    verification_message_template {
        default_email_option = "CONFIRM_WITH_CODE"
    }
}
