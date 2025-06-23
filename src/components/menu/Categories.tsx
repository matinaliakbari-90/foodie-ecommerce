interface CategoriesType {
    categories: {
        id: number;
        name: string;
    }[];
}

// filter-list-active

export default function Categories({ categories }: CategoriesType) {
    return (
        <div className="filter-list">
            <div className="form-label">
                دسته بندی
            </div>
            <ul>
                {categories.map(category => (
                    <li key={category.id} className="my-2 cursor-pointer">{category.name}</li>
                ))}
            </ul>
        </div>
    );
}