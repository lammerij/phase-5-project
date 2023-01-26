class DonationSerializer < ActiveModel::Serializer
  attributes :id, :amount, :cause_id
  belongs_to :donor
  belongs_to :cause
end
