#!/bin/bash
set -e

# Harbor Configuration
REGISTRY="harbor.hwangonjang.com"
PROJECT="library"
IMAGE_NAME="test-web"
TAG="latest"

IMAGE_FULL_NAME="${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${TAG}"

# Ensure we are in the script's directory
cd "$(dirname "$0")"

echo "========================================="
echo "1. Building Docker Image: ${IMAGE_FULL_NAME}"
echo "========================================="
docker build -t "${IMAGE_FULL_NAME}" .

echo ""
echo "========================================="
echo "2. Logging in to Harbor: ${REGISTRY}"
echo "========================================="
echo "Note: If you haven't set up DNS, ensure harbor.hwangonjang.com is in your hosts file mapping to the Web LB IP."
echo "Default Credentials: Username=admin, Password=Harbor12345"
docker login "${REGISTRY}"

echo ""
echo "========================================="
echo "3. Pushing Image to Harbor"
echo "========================================="
docker push "${IMAGE_FULL_NAME}"

echo ""
echo "========================================="
echo "🎉 Success! Image pushed successfully."
echo "========================================="
