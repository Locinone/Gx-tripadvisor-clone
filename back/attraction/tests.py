from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.conf import settings
from unittest.mock import patch

class FetchAndStoreAttractionsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('fetch_and_store_attractions')
        self.api_key = settings.TRIPADVISOR_API_KEY

    @patch('attraction.views.requests.get')
    def test_fetch_and_store_attractions(self, mock_get):
        # Mock the API response
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            'data': [
                {
                    'location_id': '123',
                    'address_obj': {
                        'street1': '123 Main St',
                        'street2': '',
                        'city': 'Anytown',
                        'address_string': '123 Main St, Anytown, USA',
                        'country': 'USA',
                        'postalcode': '12345'
                    }
                }
            ]
        }
        
        detail_response = {
            'subcategory': [{'name': 'Museum'}],
            'latitude': '40.7128',
            'longitude': '-74.0060',
            'phone': '123-456-7890',
            'website': 'https://example.com',
            'rating': 4.5,
            'review_rating_count': {'1': '10', '2': '5', '3': '15', '4': '20', '5': '50'},
            'photo_count': '100',
            'trip_types': {"name": "solo", "localized_name": "Solo travel", "value": "511"}
        }
        
        mock_get.side_effect = [mock_get.return_value, mock_get.return_value]
        mock_get.return_value.json.side_effect = [mock_get.return_value.json.return_value, detail_response]

        response = self.client.get(self.url, {'name': 'test'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Attractions fetched and stored successfully.')
