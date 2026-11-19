// Даалгавар 4: Album (private #photos) + нэмэлт FeaturedAlbum
export class Album {
  #photos = [];
  constructor(photos = []) {
    this.#photos = photos.map(p => ({ ...p, tags: [...(p.tags ?? [])] }));
  }
  get size() { return this.#photos.length; }
  get photos() { return structuredClone(this.#photos); }   // гүн хуулбар
  find(id) {
    const p = this.#photos.find(x => x.id === id);
    return p ? structuredClone(p) : undefined;
  }
  add(photo) {
    const maxId = this.#photos.reduce((m, p) => Math.max(m, p.id), 0);
    const item = { ...photo, id: photo.id ?? maxId + 1, likes: photo.likes ?? 0, tags: [...(photo.tags ?? [])] };
    this.#photos.push(item);
    return structuredClone(item);
  }
  remove(id) {
    const i = this.#photos.findIndex(p => p.id === id);
    if (i === -1) return false;
    this.#photos.splice(i, 1);
    return true;
  }
  like(id) {
    const p = this.#photos.find(x => x.id === id);
    if (!p) return undefined;
    p.likes += 1;
    return p.likes;
  }
  toJSON() { return structuredClone(this.#photos); }
  static from(json) {
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    return new this(Array.isArray(data) ? data : (data?.photos ?? []));
  }
}

// like >= 3 болмогц автоматаар онцолно
export class FeaturedAlbum extends Album {
  #featured = new Set();
  constructor(photos = []) {
    super(photos);
    this.photos.filter(p => p.likes >= 3).forEach(p => this.#featured.add(p.id));
  }
  like(id) {
    const likes = super.like(id);
    if (likes >= 3) this.#featured.add(id);
    return likes;
  }
  remove(id) { this.#featured.delete(id); return super.remove(id); }
  isFeatured(id) { return this.#featured.has(id); }
  get featured() { return this.photos.filter(p => this.#featured.has(p.id)); }
}
