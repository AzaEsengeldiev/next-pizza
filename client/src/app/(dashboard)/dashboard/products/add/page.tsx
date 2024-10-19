'use client';

import React, {useState} from 'react';
import '../../dashboard.css';
import {Input} from "@/components/ui/input";
import {useCreateProductMutation} from "@/service/product-service";

type Ingredient = {
    name: string;
    image: File | null;
};

type Product = {
    title: string;
    description: string;
    size: string[];
    typeDough: string[];
    ingredients: Ingredient[];
    price: number | null;
    image: string;
};

const initialProduct: Product = {
    title: '',
    description: '',
    size: [],
    typeDough: [],
    ingredients: [],
    price: null,
    image: ''
};

const AddProduct = () => {
    const [product, setProduct] = useState<Product>(initialProduct);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [ingredient, setIngredient] = useState<Ingredient>({name: '', image: null});
    const [createProduct] = useCreateProductMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const isArrayField = ['size', 'typeDough'].includes(name);

        setProduct(prev => ({
            ...prev,
            [name as keyof Product]: isArrayField ? value.split(',').map(item => item.trim()) : value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setSelectedFile(e.target.files[0]);
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setIngredient(prev => ({...prev, [name]: value}));
    };

    const handleIngredientFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setIngredient(prev => ({...prev, image: files[0]}));
        }
    };


    const addIngredient = () => {
        // if (ingredient.name.trim()) {
        setProduct(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, ingredient]
        }));
        setIngredient({name: '', image: null});
        // }
    };

    const removeIngredient = (index: number) => {
        setProduct(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        // Добавляем основные поля продукта
        Object.entries(product).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                // Если это массив ингредиентов, добавляем каждый ингредиент как отдельное поле
                if (key === 'ingredients') {
                    value.forEach((ingredient, index) => {
                        // formData.append(`ingredients[${index}][name]`, ingredient.name);
                        if (ingredient.image) {
                            formData.append(`ingredients[${index}][image]`, ingredient.image);
                        }
                    });
                } else {
                    // Обработка других массивов (size, typeDough и т.д.)
                    value.forEach((item) => formData.append(`${key}[]`, item));
                }
            } else if (value !== null && value !== '') {
                formData.append(key, String(value)); // Для обычных полей
            }
        });

        // Добавляем изображение продукта, если есть
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            // Отправляем форму
            await createProduct(formData).unwrap();
            setProduct(initialProduct);
            setSelectedFile(null);
            alert('Продукт успешно создан');
        } catch (error) {
            console.error('Ошибка при создании продукта:', error);
        }
    };

    const getFieldValue = (field: keyof Product) => {
        const value = product[field];
        return Array.isArray(value) ? value.join(', ') : value || '';
    };

    const titles = ['title', 'description', 'size', 'typeDough', 'price'] as Array<keyof Product>;

    return (
        <form onSubmit={handleSubmit} className="bg-bgSoft p-5 mt-4 flex flex-col gap-2">
            {/* Основные поля продукта */}
            {titles.map(field => (
                <div key={field} className="flex flex-col gap-2">
                    <h1>{field}</h1>
                    <Input
                        className="bg-primary outline-none border-none w-full"
                        type={field === 'price' ? 'number' : 'text'}
                        name={field}
                        value={getFieldValue(field)}
                        onChange={handleChange}
                    />
                </div>
            ))}

            {/* Блок ингредиентов */}
            <div className="flex flex-col gap-2">
                <h1>Ingredients</h1>
                {product.ingredients.map((ing, index) => (
                    <div key={index} className="flex flex-row gap-2 items-center">
                        <p>{ing.name}</p>
                        {ing.image && (
                            <img
                                src={URL.createObjectURL(ing.image)}
                                alt={ing.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="bg-red-500 text-white p-1"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <Input
                    className="bg-primary outline-none border-none w-full"
                    type="text"
                    name="name"
                    value={ingredient.name}
                    onChange={handleIngredientChange}
                    placeholder="Ingredient Name"
                />
                <Input
                    className="bg-primary outline-none border-none w-full"
                    type="file"
                    name="image"
                    onChange={handleIngredientFileChange}
                />
                <button type="button" onClick={addIngredient} className="bg-green-500 text-white p-2 mt-2">
                    Add Ingredient
                </button>
            </div>

            {/* Блок загрузки изображения продукта */}
            <div className="flex flex-col gap-2">
                <h1>Image</h1>
                <Input
                    className="bg-primary outline-none border-none w-full"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Create Product</button>
        </form>
    );
};

export default AddProduct;
