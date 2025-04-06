from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    page_size_query_param = "page_size"
    max_page_size = 2

    def get_paginated_response(self, data):
        return Response({
            "next": self.get_next_link(),
            "prev": self.get_previous_link(),
            "count": self.page.paginator.count,
            "page_size": self.page_size,
            "result": data
        })


