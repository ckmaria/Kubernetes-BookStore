Kubernetes BookStore

Description

Ce projet consiste à déployer une application BookStore en utilisant Kubernetes.

Technologies utilisées :
- Kubernetes
- Docker
- PostgreSQL
- Minikube
- kubectl

Fichiers principaux :
- backend-deployment.yaml
- backend-service.yaml
- frontend-deployment.yaml
- frontend-service.yaml
- postgres-deployment.yaml
- postgres-service.yaml
- postgres-pvc.yaml
- backend-hpa.yaml

Déploiement :
kubectl apply -f postgres-pvc.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f backend-hpa.yaml

Vérification :
kubectl get all -n bookstore

Auteur :
Maria Chiker
OFPPT - Développement Digital Full Stack
