<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'username' => [
                'required',
                Rule::exists('users', 'username')->where(function ($query) {
                    $query->where('estadoUser', 1);
                }),
            ],
            'password' => 'required',
        ];
    }
    
    public function getCredentials(){
        $username = $this->get('username');

        if ($this->isEmail($username)){
            return [
                'email' => $username,
                'password' => $this->get('password')
            ];
        }
        return $this->only('username', 'password');
    }

    public function isEmail($value){
        $factory = $this->container->make(Factory::class);

        return !$factory->make(['username' => $value],['username' => 'email'])->fails();
    }

    public function messages(): array
    {
        return [
            'username.exists' => 'Credenciales no válidas',
        ];
    }
}
