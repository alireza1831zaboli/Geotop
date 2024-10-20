from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


class Person(models.Model):
    name = models.CharField(_("Name"), max_length=100)
    national_code = models.CharField(
        _("National Code"),
        max_length=10,
        validators=[RegexValidator(r"^[0-9]{10}$", "Enter a 10-digit number.")],
    )

    class Expert(models.TextChoices):
        EXPERT1 = "ali asadi"
        EXPERT2 = "reza rahimi"
        EXPERT3 = "amir kashefi"

    expert = models.CharField(_("Expert"), max_length=200, choices=Expert.choices)
    birth_date = models.CharField(_("Birth Date"))
    created_at = models.DateField(_("Created At"), auto_now_add=True)
    updated_at = models.DateField(_("Updated At"), auto_now=True) 
    province = models.CharField(_("Province"), max_length=100, null=True, blank=True)
    city = models.CharField(_("City"), max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name
