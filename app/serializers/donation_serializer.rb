class DonationSerializer < ActiveModel::Serializer
  attributes :id, :amount, :donor_id
end
