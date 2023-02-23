class CauseSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :organization, :description, :amount_raised, :amount_needed, :time_remaining, :image
  belongs_to :organizer
  has_many :donations
  has_many :donors, through: :donations

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end 
end
