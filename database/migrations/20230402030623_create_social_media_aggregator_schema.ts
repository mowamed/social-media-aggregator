import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username', 255).unique().notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('password', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('social_accounts', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.string('platform', 255).notNullable();
      table.string('platform_user_id', 255).notNullable();
      table.string('access_token', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.unique(['user_id', 'platform', 'platform_user_id']);
    })
    .createTable('posts', (table) => {
      table.increments('id').primary();
      table.integer('social_account_id').unsigned().notNullable();
      table
        .foreign('social_account_id')
        .references('social_accounts.id')
        .onDelete('CASCADE');
      table.string('platform_post_id', 255).notNullable();
      table.text('content').notNullable();
      table.text('media_url');
      table.text('post_url').notNullable();
      table.timestamp('published_at').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.unique(['social_account_id', 'platform_post_id']);
    })
    .then(() =>
      knex.schema.raw(
        'CREATE INDEX idx_posts_social_account_id ON posts(social_account_id)',
      ),
    )
    .then(() =>
      knex.schema.raw(
        'CREATE INDEX idx_posts_published_at ON posts(published_at)',
      ),
    );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('posts')
    .dropTableIfExists('social_accounts')
    .dropTableIfExists('users');
}
