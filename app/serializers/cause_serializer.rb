class CauseSerializer < ActiveModel::Serializer
  attributes :id, :name, :organization, :organizer_id
end
