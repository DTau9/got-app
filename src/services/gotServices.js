export default class GotServices {

	constructor() {
		this._apiBase = 'https://www.anapioficeandfire.com/api';
	}

	gettResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	}


	getAllCharacters = async () => {
		const res = await this.gettResource('/characters?page=5&pageSize=10');
		return res.map(this._trasformCharacter);
	}

	getCharacter = async (id) => {
		const character = await this.gettResource(`/characters/${id}`);
		return this._trasformCharacter(character);
	}

	getAllBooks = async () => {
		const res = await this.gettResource('/books/');
		return res.map(this._transformBook);
	}

	getBook = async (id) => {
		const book = await this.gettResource(`/books/${id}`);
		return this._transformBook(book);
	}

	getAllHouses = async () => {
		const res = await this.gettResource('/houses/');
		return res.map(this._transformHouse);
	}

	getHouse = async (id) => {
		const house = await this.gettResource(`/houses/${id}`);
		return this._transformHouse(house);
	}

	isEmptyData(data) {
		if (data) {
			return data
		} else {
			return 'No data'
		}
	}

	_exttractId = (item) => {
		const idRegExp = /\/([0-9]*)$/;
		return item.url.match(idRegExp)[1];
	}

	_trasformCharacter = (char) => {
		return {
			id: this._exttractId(char),
			name: this.isEmptyData(char.name),
			gender: this.isEmptyData(char.gender),
			born: this.isEmptyData(char.born),
			died: this.isEmptyData(char.died),
			culture: this.isEmptyData(char.culture)
		};
	}

	_transformHouse = (house) => {
		return {
			id: this._exttractId(house),
			name: this.isEmptyData(house.name),
			region: this.isEmptyData(house.region),
			words: this.isEmptyData(house.words),
			titles: this.isEmptyData(house.titles),
			overlord: this.isEmptyData(house.overlord),
			ancestralWeapons: this.isEmptyData(house.ancestralWeapons)
		}
	}

	_transformBook = (book) => {
		return {
			id: this._exttractId(book),
			name: this.isEmptyData(book.name),
			numberOfPages: this.isEmptyData(book.numberOfPages),
			publisher: this.isEmptyData(book.publisher),
			released: this.isEmptyData(book.released)
		}
	}
}
