#!/usr/bin/env bash
echo "www.dordtfilm.nl" > build/CNAME
   angular-cli-ghpages --branch deploy --no-silent \
   --repo="https://$GITHUB_TOKEN@github.com/FastWorks-Studio/dordtfilm.nl.git" \
   --name="Automatic deployment" --email="info@fastworks-studio.nl"
