resource "google_storage_bucket" "media" {
  name          = "media-${var.project}"
  location      = "us-central1"
  storage_class = "REGIONAL"
}

data "google_iam_policy" "mediaaccess" {

  binding {
    role    = "roles/storage.legacyBucketOwner"
    members = ["projectOwner:${var.project}", "projectEditor:${var.project}", local.server_SA, local.automation_SA]
  }
  binding {
    role    = "roles/storage.legacyBucketReader"
    members = ["projectViewer:${var.project}"]
  }
}

resource "google_storage_bucket_iam_policy" "policy" {
  bucket      = google_storage_bucket.media.name
  policy_data = data.google_iam_policy.mediaaccess.policy_data
}
