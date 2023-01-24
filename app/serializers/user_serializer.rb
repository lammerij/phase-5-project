class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :display_name, :type
end
