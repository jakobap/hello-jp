ifneq (,$(wildcard ./.env))
    include .env
    export
endif

config:
	gcloud config set project ${GCP_PROJECT_ID}
	gcloud config set ai/region ${GCP_REGION}
	gcloud config set run/region ${GCP_REGION}
	gcloud config set artifacts/location ${GCP_REGION}

init:
	gcloud services enable {firestore,documentai,storage,aiplatform,compute,run,cloudbuild,artifactregistry}.googleapis.com

build-stag:
	gcloud builds submit . \
		--tag $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-images/hello-jp-llmserver:latest-stag
													  
deploy-stag:
		gcloud run deploy hello-jp-llmserver-stag \
			--image $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-images/hello-jp-llmserver:latest-stag \
			--region europe-west1 \
			--allow-unauthenticated

build-prod:
	gcloud builds submit . \
		--tag $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-images/hello-jp-llmserver:latest-prod

deploy-prod:
		gcloud run deploy hello-jp-llmserver \
			--image $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-images/hello-jp-llmserver:latest-prod \
			--region europe-west1 \
			--allow-unauthenticated


all-stag: config init build-stag deploy-stag

all-prod: config init build-prod deploy-prod