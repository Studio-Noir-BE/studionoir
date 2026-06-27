# AWS S3 Filesystem setup

## Create S3 bucket

1. Navigeer in AWS naar de servie **S3**, dit doe je best door gewoon te zoeken naar **s3**
2. Klik op **Create bucket**
3. Geef je bucket een gepaste naam, bij voorkeur volgende format: **studionoir-projectnaam**
    1. "Bucket names must be unique across all AWS accounts in all the AWS Regions within a partition."
    2. Bv: **studionoir-hyboma**
4. Kies voor een region in Europe, bij voorkeur **eu-west-3**
5. Zorg dat de optie "Block all public access" **af staat**, aangezien we de assets gaan tonen via CloudFront
6. Create bucket

## Create a custom permissions policy

1. Navigaar in AWS naar **IAM**, dit doe je best door gewoon te zoeken naar **iam**
2. Klik op **Create policy**
3. Kies voor **JSON** als policy editor
4. Plak hier volgende JSON code en pas onderaan 2x **REPLACE-WITH-BUCKET-NAME** aan naar de bucket naam die je in stap 1 gekozen hebt
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "acm:ListCertificates",
                    "cloudfront:GetDistribution",
                    "cloudfront:GetStreamingDistribution",
                    "cloudfront:GetDistributionConfig",
                    "cloudfront:ListDistributions",
                    "cloudfront:ListCloudFrontOriginAccessIdentities",
                    "cloudfront:CreateInvalidation",
                    "cloudfront:GetInvalidation",
                    "cloudfront:ListInvalidations",
                    "elasticloadbalancing:DescribeLoadBalancers",
                    "iam:ListServerCertificates",
                    "sns:ListSubscriptionsByTopic",
                    "sns:ListTopics",
                    "waf:GetWebACL",
                    "waf:ListWebACLs"
                ],
                "Resource": "*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:GetBucketLocation",
                    "s3:ListAllMyBuckets"
                ],
                "Resource": "*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:ListBucket"
                ],
                "Resource": [
                    "arn:aws:s3:::REPLACE-WITH-BUCKET-NAME"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:*"
                ],
                "Resource": [
                    "arn:aws:s3:::REPLACE-WITH-BUCKET-NAME/*"
                ]
            }
        ]
    }
    ```

    
5. Klik **Next** en geef de policy een duidelijk naam en beschrijving
    1. **Naam**: *projectnaam*-policy
    2. **beschrijving**: Permission policy for *projectnaam*
6. Klik op **Create policy**

## Create a user
1. Navigeer binnen **IAM** naar **Users** en selecteer **studionoir-group** en klik op de **Create user** knop
2. Gebruik je *projectnaam* als naam voor je user
3. Kies bij **Permission options** voor de laatste optie: **Attach policies directly**
4. Zoek bij **Permissions policies** achter de policy die we hierboven gemaakt hebben: *projectnaam*-policy
5. Klik **Next**, bevestig je gekozen opties en klik vervolgens op **Create user**

## Setup CloudFront distribution
1. Navigaar in AWS naar **CloudFront**, dit doe je best door gewoon te zoeken naar **cloudfront** en klik op **Create distribution**
2. pas volgende instellingen toe:
    1. **Origin domain:** Kies voor de bucket die we in stap 1 gemaakt hebben: studionoir-*projectnaam*
    2. **Origin access:** Legacy access identities
        1. Klik op **Create new OAI**, gebruik de voorgestelde naam en klik op **Create**
        2. **Bucket policy:** Yes, update the bucket policy
    3. **Compress objects automatically:** Yes
    4. **Viewer protocol policy:** Redirect HTTP to HTTPS
    5. **Allowed HTTP methods:** GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
    6. **Cache key and origin requests:** Cache policy and origin request policy (recommended)
        1. **Cache policy:** CachingOptimized
    7. **DISABLE Web Application Firewall (WAF):** DISABLE
    8. **Description:** *Projectnaam*
3. Klik op **Create distribution**

## Craft CMS setup
1. Voeg volgende credetions toe in je **.env**
    ```env
    # S3 settings
    S3_KEY_ID=XXXXXXXXXX
    S3_SECRET=XXXXXXXXXX
    S3_BUCKET=studionoir-projectnaam
    S3_REGION=eu-west-3

    # CloudFront settings
    CLOUDFRONT_URL=https://xxxxxx.cloudfront.net
    CLOUDFRONT_DISTRIBUTION_ID=xxxxxxx
    CLOUDFRONT_PATH_PREFIX=
    ``````
2. Pas de **ENV** aan:
    1. S3 settings
        1. **S3_KEY_ID:** IAM -> users -> select user -> Create access key -> Command Line Interface (CLI)
        2. **S3_SECRET:** IAM -> users -> select user -> Create access key -> Command Line Interface (CLI)
            1. Pas op: deze code is slecths 1x zichtbaar, daarna kan je deze niet meer opniew zien.
        3. **S3_BUCKET:** Naam van je bucket die we bij stap 1 gemaakt hebben: studionoir-*projectnaam*
        4. **S3_REGION:** Region, meestal **eu-west-3**, kan je checken via **S3 -> buckets -> AWS Region**
    1. CloudFront settings:
        1. **CLOUDFRONT_URL:** CloudFront -> klik op je project -> *Distribution domain name*
        2. **CLOUDFRONT_DISTRIBUTION_ID:** CloudFront -> Meteen in het overzicht in de eerst column: **ID**
        3. **CLOUDFRONT_PATH_PREFIX:** Optioneel path pre-fix
3. Voeg de Amazon S3 plugin van Pixel & Tonic toe
    ```
    composer require craftcms/aws-s3 -w && php craft plugin/install aws-s3
    ```
4. Link AWS aan je bestandsysteem
    1. **Basis-URL:** $CLOUDFRONT_URL
    2. **Access Key ID:** $S3_KEY_ID
    3. **Secret Access Key:** $S3_SECRET
    4. **BucketVereist:** *Manual* -> $S3_BUCKET -> $S3_REGION
    5. **Subfolder:** $CLOUDFRONT_PATH_PREFIX
    6. **Add the subfolder to the Base URL?:** true
    7. **Make Uploads Public:** false
    8. **Cache Duration:** 3 maanden
