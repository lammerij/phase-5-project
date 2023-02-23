class Cause < ApplicationRecord
  belongs_to :organizer
  has_many :donations
  has_many :donors, through: :donations
  has_one_attached :image

  validates :name, presence: true, uniqueness: true
  validates :organization, presence: true, uniqueness: true
  validates :description, presence: true, length: {minimum: 10}
  validates :amount_raised, presence: true
  validates :amount_needed, presence: true
  validates :time_remaining, presence: true
end
