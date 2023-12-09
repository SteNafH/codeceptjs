FROM golang:1.21.1-alpine AS build

WORKDIR /app

COPY . .

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

RUN go build -ldflags="-w -s" ./cmd/main.go

FROM scratch

WORKDIR /app

COPY --from=build /app/main .
COPY views views
COPY css css

CMD ["./main"]
