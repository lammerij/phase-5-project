class User < ApplicationRecord
  has_secure_password
  has_one_attached :avatar
  validates :username, presence: true
  validates :display_name, presence: true
  validates :type, presence: true
  validates :password, presence: true

  validate :acceptable_image

  def acceptable_image
      return unless avatar.attached?

      unless avatar.byte_size <= 3.megabyte
          errors.add(:main_image, "image size too large")
      end

      acceptable_types = ["image/jpeg", "image/png"]
      unless acceptable_types.include?(avatar.content_type)
          errors.add(:avatar, "must be a JPEG or PNG")
      end

  end
end
