output "name" {
    value = var.name
}
output "key" {
    value = var.key
}
output "id" {
    value = random_uuid.id.result
}