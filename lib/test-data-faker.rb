require 'faker'

if Rails.env.development?
  # wipe DB
  Blog.destroy_all
  Tag.destroy_all
  BlogsTag.destroy_all
end

if Rails.env.development?
  # CATEGORIES = %w[platform genre]
  pc = Tag.find_or_create_by(name: 'PC', category: 'platform')
  ps = Tag.find_or_create_by(name: 'PlayStation', category: 'platform')
  fps = Tag.find_or_create_by(name: 'First Person Shooter', category: 'genre')
  td = Tag.find_or_create_by(name: 'Top Down', category: 'genre')

  90.times {
    Blog.create(
      title: Faker::Game.title,
      body: rand(3..10).times.collect { Faker::Lorem.paragraphs(number: rand(3..10)) }.join("\n\n"),
      platform_tag_ids: [
        rand(2) == 0 ? pc.id : ps.id,
        rand(2) == 0 ? fps.id : td.id,
      ]
    )
  }
end
