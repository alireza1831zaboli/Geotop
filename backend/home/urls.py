from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home.as_view(), name="home"),
    path("api/", views.Home.as_view(), name="person-create"),
    path("api/edit/<int:person_id>/", views.EditPeople.as_view(), name="person-edit"),
    path("api/export/", views.ExportToExcelView.as_view(), name="export"),
    path(
        "api/delete/<int:person_id>/",
        views.DeletePeople.as_view(),
        name="person-delete",
    ),
]
