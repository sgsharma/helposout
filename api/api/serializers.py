from rest_framework import serializers

from .models import Job, Organization, Partner, Applicant


class JobSerializer(serializers.ModelSerializer):
    organization_name = serializers.RelatedField(source='org', read_only=True)
    class Meta:
        model = Job
        fields = '__all__'


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):
    organization_name = serializers.RelatedField(source='org', read_only=True)
    class Meta:
        model = Partner
        fields = '__all__'


class ApplicantSerializer(serializers.ModelSerializer):
    organization_name = serializers.RelatedField(source='org', read_only=True)
    class Meta:
        model = Applicant
        fields = '__all__'