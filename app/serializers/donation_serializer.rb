class DonationSerializer < ActiveModel::Serializer
  attributes :id, :amount, :cause_id
  has_one :donor
end
