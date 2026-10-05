import assert from "node:assert/strict";
import { test } from "node:test";
import { Book } from "../../src/entities/Book.ts";
import { Loan } from "../../src/entities/Loan.ts";
import { User } from "../../src/entities/User.ts";

for (const quantity of [0, 1, 10]) {
  test(`Book aceita quantidade inicial inteira e não negativa: ${quantity}`, () => {
    const book = new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", quantity);

    assert.equal(book.getQuantity(), quantity);
  });
}

for (const quantity of [-1, -0.5, 0.5, 1.5, NaN, Infinity, -Infinity]) {
  test(`Book rejeita quantidade inicial inválida: ${quantity}`, () => {
    assert.throws(
      () => new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", quantity),
      { message: "Initial quantity must be a non-negative integer" },
    );
  });
}

test("Book controla o estoque ao emprestar e devolver uma cópia", () => {
  const book = new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", 2);

  assert.equal(book.getQuantity(), 2);
  book.decrease();
  assert.equal(book.getQuantity(), 1);
  book.increase();
  assert.equal(book.getQuantity(), 2);
});

test("Book impede a retirada sem cópias e mantém o estoque zerado", () => {
  const book = new Book(1, "Dom Casmurro", "Machado de Assis", "Romance", 1);
  book.decrease();

  assert.throws(() => book.decrease(), { message: "No copies available" });
  assert.equal(book.getQuantity(), 0);
});

test("User e Loan representam o usuário e seu vínculo com o livro", () => {
  const user = new User(1, "Ana");
  const loan = new Loan(user.id, 2);

  assert.equal(user.id, 1);
  assert.equal(user.name, "Ana");
  assert.equal(loan.userId, 1);
  assert.equal(loan.bookId, 2);
});
