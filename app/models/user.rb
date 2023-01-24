class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true, length: { minimum: 4 }
  validates :display_name, presence: true, uniqueness: true, length: { minimum: 8 }
  validates :password, length: { in: 6..20 }
  validates :password_confirmation, length: { in: 6..20 }
  validates :type, presence: true
end
