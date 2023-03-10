class User < ApplicationRecord
  has_secure_password
  has_one_attached :image
  validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
  validates :password, presence: true, :on => :create
  validates :display_name, presence: true, uniqueness: true, length: { minimum: 5 }
  validates :type, presence: true

  validate :acceptable_image

  def acceptable_image
    return unless image.attached?

    acceptable_types = ["image/jpeg", "image/png"]
    unless acceptable_types.include?(image.content_type)
      errors.add(:image, "must be a JPEG or PNG")
    end
  end
end
