ifneq (,$(wildcard ./.env))
    include .env
    export
endif

config:
	gcloud config set project ${GCP_PROJECT_ID}
	gcloud config set ai/region ${GCP_REGION}
	gcloud config set run/region ${GCP_REGION}
	gcloud config set artifacts/location ${ARTIFACT_GEO}

init:
	gcloud services enable {firestore,documentai,storage,aiplatform,compute,run,cloudbuild,artifactregistry}.googleapis.com

build-stag:
	gcloud builds submit . \
		--tag $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-repo/hello-jp-img-prod:latest-stag
													  
deploy-stag:
	europe-docker.pkg.dev/
		gcloud run deploy hello-jp-serv-stag \
			--image $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-repo/hello-jp-img-prod:latest-stag \
			--region europe-west1 \
			--allow-unauthenticated

build-prod:
	gcloud builds submit . \
		--tag $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-repo/hello-jp-img-prod:latest-prod

deploy-prod:
	europe-docker.pkg.dev/
		gcloud run hello-jp-serv-prod \
			--image $$(gcloud config get-value artifacts/location)-docker.pkg.dev/jp-website-410806/hello-jp-repo/hello-jp-img-prod:latest-prod \
			--region europe-west1 \
			--allow-unauthenticated


all-stag: config init build-stag deploy-stag

all-prod: config init build-prod deploy-prod