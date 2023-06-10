output "name" {
    value = var.name
}
output "id" {
    value = random_uuid.id.result
}