export interface ISpecification<T> {
	isSatisfiedBy(t: T): boolean;
	and(other: ISpecification<T>): ISpecification<T>;
	or(other: ISpecification<T>): ISpecification<T>;
	not(): ISpecification<T>;
}

export abstract class AbstractSpecification<T> implements ISpecification<T> {
	abstract isSatisfiedBy(t: T): boolean;

	and(other: ISpecification<T>): ISpecification<T> {
		return new AndSpecification(this, other);
	}

	or(other: ISpecification<T>): ISpecification<T> {
		return new OrSpecification(this, other);
	}

	not(): ISpecification<T> {
		return new NotSpecification(this);
	}
}

export class AndSpecification<T> extends AbstractSpecification<T> {
	private left: ISpecification<T>;
	private right: ISpecification<T>;

	constructor(left: ISpecification<T>, right: ISpecification<T>) {
		super();
		this.left = left;
		this.right = right;
	}

	isSatisfiedBy(t: T): boolean {
		return this.left.isSatisfiedBy(t) && this.right.isSatisfiedBy(t);
	}
}

export class OrSpecification<T> extends AbstractSpecification<T> {
	private left: ISpecification<T>;
	private right: ISpecification<T>;

	constructor(left: ISpecification<T>, right: ISpecification<T>) {
		super();
		this.left = left;
		this.right = right;
	}

	isSatisfiedBy(t: T): boolean {
		return this.left.isSatisfiedBy(t) || this.right.isSatisfiedBy(t);
	}
}

export class NotSpecification<T> extends AbstractSpecification<T> {
	private specification: ISpecification<T>;

	constructor(specification: ISpecification<T>) {
		super();
		this.specification = specification;
	}

	isSatisfiedBy(t: T): boolean {
		return !this.specification.isSatisfiedBy(t);
	}
}
