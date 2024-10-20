from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Person
from .serializers import PersonSerializer
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from datetime import datetime
import jdatetime



@method_decorator(csrf_exempt, name="dispatch")
class Home(APIView):
    serializer_class = PersonSerializer
    renderer_classes = [TemplateHTMLRenderer, JSONRenderer]
    template_name = "geotop.html"
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        search_term = request.GET.get("search", "")
        people = Person.objects.filter(
            Q(name__icontains=search_term)
            | Q(national_code__icontains=search_term)
            | Q(expert__icontains=search_term)
            | Q(province__icontains=search_term)
            | Q(city__icontains=search_term)
        )
        people_count = people.count()
        page_count = (
            people_count // 10 if people_count % 10 == 0 else (people_count // 10) + 1
        )
        page = int(request.GET.get("page", 1))
        people = people[(page - 1) * 10 : page * 10]

        for person in people:
            created_date = person.created_at.strftime("%Y-%m-%d")
            shamsi_cr_date = jdatetime.date.fromgregorian(
                date=jdatetime.datetime.strptime(created_date, "%Y-%m-%d").date()
            )

            update_date = person.updated_at.strftime("%Y-%m-%d")
            shamsi_up_date = jdatetime.date.fromgregorian(
                date=jdatetime.datetime.strptime(update_date, "%Y-%m-%d").date()
            )

            person.created_at = shamsi_cr_date.strftime("%Y-%m-%d")
            person.updated_at = shamsi_up_date.strftime("%Y-%m-%d")

        serializer = PersonSerializer(people, many=True)

        return Response({"people": serializer.data, "page_count": page_count})

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.validated_data["created_at"] = datetime.now().date()
            serializer.validated_data["updated_at"] = datetime.now().date()
            serializer.save()
            return Response({"people": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditPeople(APIView):
    serializer_class = PersonSerializer
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "geotop.html"

    def put(self, request, person_id):
        try:
            person = Person.objects.get(id=person_id)
        except Person.DoesNotExist:
            return Response(
                {"error": "Person not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(person, data=request.data)
        if serializer.is_valid():
            serializer.validated_data["updated_at"] = datetime.now()
            serializer.save()
            return Response({"people": serializer.data})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeletePeople(APIView):
    serializer_class = PersonSerializer
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "geotop.html"

    def delete(self, request, person_id):
        try:
            person = Person.objects.get(id=person_id)
        except Person.DoesNotExist:
            return Response(
                {"error": "Person not found"}, status=status.HTTP_404_NOT_FOUND
            )

        person.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExportToExcelView(APIView):
    def get(self, request):
        queryset = Person.objects.all()
        for person in queryset:
            created_date = person.created_at.strftime("%Y-%m-%d")
            shamsi_cr_date = jdatetime.date.fromgregorian(
                date=jdatetime.datetime.strptime(created_date, "%Y-%m-%d").date()
            )

            update_date = person.updated_at.strftime("%Y-%m-%d")
            shamsi_up_date = jdatetime.date.fromgregorian(
                date=jdatetime.datetime.strptime(update_date, "%Y-%m-%d").date()
            )

            person.created_at = shamsi_cr_date.strftime("%Y-%m-%d")
            person.updated_at = shamsi_up_date.strftime("%Y-%m-%d")
        serializer = PersonSerializer(queryset, many=True)
        return Response(serializer.data)
