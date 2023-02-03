class Cause < ApplicationRecord
  belongs_to :organizer
  has_many :donations
  has_many :donors, through: :donations

  validates :name
  validates :organization
  validates :description
end
