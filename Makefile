.PHONY: dev prod

dev:
	docker-compose up -d --build mc-dev

prod:
	docker-compose up -d --build mc-prod