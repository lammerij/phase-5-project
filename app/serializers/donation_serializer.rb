class DonationSerializer < ActiveModel::Serializer
  attributes :id, :amount, :fundraiser_id, :donor_id
end
