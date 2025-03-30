<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('category_id')->unsigned();
            $table->string('type')->nullable(false)->comment('収支タイプ');
            $table->timestamp('date')->nullable(false)->comment('取引日時');
            $table->integer('amount')->nullable(false)->comment('金額');
            $table->string('content', 100)->nullable()->comment('内容');
            $table->timestamps();
            $table->softDeletes()->nullable();

            $table->foreign('category_id')->references('id')->on('categories')->OnDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
