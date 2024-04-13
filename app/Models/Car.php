<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'merk',
        'plat',
        'status',
        'price',
        'image',
    ];
    
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
