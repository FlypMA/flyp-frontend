import { SortDirection } from './enums';
/**
 * Base repository interface for all entities
 */
export interface BaseRepository<
  T,
  CreateDto = Omit<T, 'id' | 'created_at' | 'updated_at'>,
  UpdateDto = Partial<CreateDto>,
> {
  findById(id: string): Promise<T | null>;
  findMany(options?: RepositoryOptions): Promise<RepositoryResult<T>>;
  create(data: CreateDto): Promise<T>;
  update(id: string, data: UpdateDto): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  count(where?: WhereClause<T>): Promise<number>;
  exists(where: WhereClause<T>): Promise<boolean>;
}
/**
 * Repository query options
 */
export interface RepositoryOptions<T = any> {
  where?: WhereClause<T>;
  select?: SelectClause<T>;
  include?: IncludeClause;
  orderBy?: OrderByClause<T>;
  limit?: number;
  offset?: number;
  distinct?: boolean;
}
/**
 * Repository result with metadata
 */
export interface RepositoryResult<T> {
  data: T[];
  total: number;
  limit?: number;
  offset?: number;
  hasMore: boolean;
}
/**
 * Where clause for filtering
 */
export type WhereClause<T> = {
  [K in keyof T]?:
    | T[K]
    | {
        equals?: T[K];
        not?: T[K];
        in?: T[K][];
        notIn?: T[K][];
        lt?: T[K];
        lte?: T[K];
        gt?: T[K];
        gte?: T[K];
        contains?: string;
        startsWith?: string;
        endsWith?: string;
        mode?: 'insensitive' | 'default';
      }
    | null;
} & {
  AND?: WhereClause<T>[];
  OR?: WhereClause<T>[];
  NOT?: WhereClause<T>;
};
/**
 * Select clause for choosing fields
 */
export type SelectClause<T> = {
  [K in keyof T]?: boolean;
};
/**
 * Include clause for relationships
 */
export type IncludeClause = Record<
  string,
  | boolean
  | {
      select?: Record<string, boolean>;
      where?: Record<string, any>;
      orderBy?: Record<string, SortDirection>;
      take?: number;
      skip?: number;
    }
>;
/**
 * Order by clause for sorting
 */
export type OrderByClause<T> =
  | {
      [K in keyof T]?: SortDirection;
    }
  | Array<{
      [K in keyof T]?: SortDirection;
    }>;
/**
 * Transaction interface
 */
export interface DatabaseTransaction {
  commit(): Promise<void>;
  rollback(): Promise<void>;
  isCompleted(): boolean;
}
/**
 * Database connection interface
 */
export interface DatabaseConnection {
  transaction<T>(callback: (tx: DatabaseTransaction) => Promise<T>): Promise<T>;
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  execute(
    sql: string,
    params?: any[]
  ): Promise<{
    affectedRows: number;
    insertId?: string;
  }>;
  close(): Promise<void>;
  isConnected(): boolean;
}
/**
 * Migration interface
 */
export interface Migration {
  id: string;
  name: string;
  up(connection: DatabaseConnection): Promise<void>;
  down(connection: DatabaseConnection): Promise<void>;
  timestamp: Date;
}
/**
 * Seed data interface
 */
export interface SeedData {
  id: string;
  name: string;
  execute(connection: DatabaseConnection): Promise<void>;
  dependencies?: string[];
}
/**
 * Database configuration
 */
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?:
    | boolean
    | {
        rejectUnauthorized?: boolean;
        ca?: string;
        cert?: string;
        key?: string;
      };
  pool?: {
    min?: number;
    max?: number;
    idle?: number;
    acquire?: number;
    evict?: number;
  };
  logging?: boolean | ((sql: string, duration: number) => void);
  timezone?: string;
}
/**
 * Query builder interface
 */
export interface QueryBuilder<T = any> {
  select(fields?: (keyof T)[] | string): this;
  from(table: string): this;
  where(condition: WhereClause<T> | string, params?: any[]): this;
  and(condition: WhereClause<T> | string, params?: any[]): this;
  or(condition: WhereClause<T> | string, params?: any[]): this;
  join(table: string, on: string): this;
  leftJoin(table: string, on: string): this;
  rightJoin(table: string, on: string): this;
  innerJoin(table: string, on: string): this;
  orderBy(field: keyof T | string, direction?: SortDirection): this;
  groupBy(fields: (keyof T)[] | string[]): this;
  having(condition: string, params?: any[]): this;
  limit(count: number): this;
  offset(count: number): this;
  distinct(): this;
  build(): {
    sql: string;
    params: any[];
  };
  execute(): Promise<T[]>;
  first(): Promise<T | null>;
  count(): Promise<number>;
  exists(): Promise<boolean>;
}
/**
 * Supabase-specific types
 */
export interface SupabaseClient {
  from<T = any>(table: string): SupabaseQueryBuilder<T>;
  auth: {
    getUser(): Promise<{
      data: {
        user: any;
      } | null;
      error: any;
    }>;
    signIn(credentials: { email: string; password: string }): Promise<{
      data: any;
      error: any;
    }>;
    signUp(credentials: { email: string; password: string }): Promise<{
      data: any;
      error: any;
    }>;
    signOut(): Promise<{
      error: any;
    }>;
  };
  storage: {
    from(bucket: string): {
      upload(
        path: string,
        file: File | Buffer
      ): Promise<{
        data: any;
        error: any;
      }>;
      download(path: string): Promise<{
        data: any;
        error: any;
      }>;
      remove(paths: string[]): Promise<{
        data: any;
        error: any;
      }>;
    };
  };
}
/**
 * Supabase query builder
 */
export interface SupabaseQueryBuilder<T = any> {
  select(columns?: string): this;
  insert(data: Partial<T> | Partial<T>[]): this;
  update(data: Partial<T>): this;
  delete(): this;
  eq(column: keyof T, value: any): this;
  neq(column: keyof T, value: any): this;
  gt(column: keyof T, value: any): this;
  gte(column: keyof T, value: any): this;
  lt(column: keyof T, value: any): this;
  lte(column: keyof T, value: any): this;
  like(column: keyof T, pattern: string): this;
  ilike(column: keyof T, pattern: string): this;
  is(column: keyof T, value: any): this;
  in(column: keyof T, values: any[]): this;
  contains(column: keyof T, value: any): this;
  containedBy(column: keyof T, value: any): this;
  rangeGt(column: keyof T, range: string): this;
  rangeGte(column: keyof T, range: string): this;
  rangeLt(column: keyof T, range: string): this;
  rangeLte(column: keyof T, range: string): this;
  rangeAdjacent(column: keyof T, range: string): this;
  overlaps(column: keyof T, value: any): this;
  textSearch(column: keyof T, query: string): this;
  match(query: Record<string, any>): this;
  not(column: keyof T, operator: string, value: any): this;
  or(filters: string): this;
  and(filters: string): this;
  filter(column: keyof T, operator: string, value: any): this;
  order(
    column: keyof T,
    options?: {
      ascending?: boolean;
      nullsFirst?: boolean;
    }
  ): this;
  limit(count: number): this;
  range(from: number, to: number): this;
  single(): this;
  maybeSingle(): this;
  csv(): this;
  then<
    TResult1 = {
      data: T[] | null;
      error: any;
    },
    TResult2 = never,
  >(
    onfulfilled?:
      | ((value: { data: T[] | null; error: any }) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined
  ): Promise<TResult1 | TResult2>;
}
/**
 * Database indexes for optimization
 */
export interface DatabaseIndex {
  name: string;
  table: string;
  columns: string[];
  unique?: boolean;
  partial?: string;
  type?: 'btree' | 'hash' | 'gin' | 'gist';
}
/**
 * Database constraints
 */
export interface DatabaseConstraint {
  name: string;
  table: string;
  type: 'primary_key' | 'foreign_key' | 'unique' | 'check' | 'not_null';
  columns: string[];
  reference?: {
    table: string;
    columns: string[];
    onDelete?: 'cascade' | 'restrict' | 'set_null' | 'set_default';
    onUpdate?: 'cascade' | 'restrict' | 'set_null' | 'set_default';
  };
  expression?: string;
}
/**
 * Table schema definition
 */
export interface TableSchema {
  name: string;
  columns: ColumnDefinition[];
  indexes?: DatabaseIndex[];
  constraints?: DatabaseConstraint[];
  comment?: string;
}
/**
 * Column definition
 */
export interface ColumnDefinition {
  name: string;
  type: string;
  nullable?: boolean;
  default?: any;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  unique?: boolean;
  comment?: string;
  length?: number;
  precision?: number;
  scale?: number;
}
/**
 * Database backup configuration
 */
export interface BackupConfig {
  schedule: string;
  retention: number;
  destination: {
    type: 's3' | 'gcs' | 'local';
    bucket?: string;
    path?: string;
    credentials?: Record<string, any>;
  };
  compression?: boolean;
  encryption?: {
    enabled: boolean;
    key?: string;
  };
}
/**
 * Database monitoring metrics
 */
export interface DatabaseMetrics {
  connections: {
    active: number;
    idle: number;
    total: number;
    max: number;
  };
  queries: {
    total: number;
    slow: number;
    avgDuration: number;
    errors: number;
  };
  tables: Array<{
    name: string;
    rows: number;
    size: string;
    lastUpdated: Date;
  }>;
  performance: {
    cpu: number;
    memory: number;
    disk: {
      used: string;
      available: string;
      utilization: number;
    };
  };
  replication?: {
    lag: number;
    status: 'healthy' | 'degraded' | 'failed';
    lastSync: Date;
  };
}
/**
 * Cache interface for database query caching
 */
export interface DatabaseCache {
  get<T = any>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(pattern?: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  ttl(key: string): Promise<number>;
  generateKey(table: string, query: any): string;
}
/**
 * Database event types for monitoring and debugging
 */
export interface DatabaseEvent {
  type: 'query' | 'error' | 'connection' | 'transaction';
  timestamp: Date;
  duration?: number;
  sql?: string;
  params?: any[];
  error?: Error;
  metadata?: Record<string, any>;
}
/**
 * Database listener interface
 */
export interface DatabaseListener {
  onQuery?(event: DatabaseEvent): void;
  onError?(event: DatabaseEvent): void;
  onConnection?(event: DatabaseEvent): void;
  onTransaction?(event: DatabaseEvent): void;
}
