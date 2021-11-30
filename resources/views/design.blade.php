@extends('layout')

@section('content')
    <div class="px-10">
        <div class="bg-white mt-10 rounded-md shadow-lg max-w-xl mx-auto pt-6 pb-3 px-4" id="dc-1">
            <h1 class="text-center font-semibold"><span class="text-gray-700">1/4</span> Contact Information</h1>
            <h1 class=" mt-1 text-center font-semibold text-xs text-gray-600">Enter the following fields</h1>
            <hr class="my-6">
            <div class="mb-2"><label for="name" class=" w-24 inline-block text-xs pr-4">Name</label><input id="name_field" type="text" name="name" class=" inline w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="email" class=" w-24 inline-block text-xs pr-4">Email</label><input id="email_field" type="text" name="email" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="phone" class=" w-24 inline-block text-xs pr-4">Phone #</label><input id="phone_field" type="text" name="phone" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="h-8">
                <input id="next-1" type="button" value="Next" class="bg-gray-700 text-white tracking-wide font-semibold rounded-md py-1 px-4 hover:bg-gray-900 float-right cursor-pointer">
            </div>
        </div>
        <div class="bg-white mt-10 rounded-md shadow-lg max-w-xl mx-auto pt-6 pb-3 px-4 hidden" id="dc-2">
            <h1 class="text-center font-semibold"><span class="text-gray-700">2/4</span> Jobsite Information</h1>
            <h1 class=" mt-1 text-center font-semibold text-xs text-gray-600">Enter the following fields</h1>
            <hr class="my-6">
            <div class="mb-2"><label for="street" class=" w-24 inline-block text-xs pr-4">Street</label><input id="street_field" type="text" name="street" class=" inline w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="city" class=" w-24 inline-block text-xs pr-4">City</label><input id="city_field" type="text" name="city" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="zip" class=" w-24 inline-block text-xs pr-4">Zip Code</label><input id="zip_field" type="zip" name="zip" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="h-8">
                <input id="next-2" type="button" value="Next" class="bg-gray-700 text-white tracking-wide font-semibold rounded-md py-1 px-4 hover:bg-gray-900 float-right cursor-pointer">
                <input id="prev-2" type="button" value="Back" class="bg-gray-400 text-white tracking-wide font-semibold rounded-md py-1 px-4 hover:bg-gray-700 float-right mr-3 cursor-pointer">
            </div>
        </div>
        <div class="bg-white mt-10 rounded-md shadow-lg max-w-xl mx-auto pt-6 pb-3 px-4" id="dc-3" hidden>
            <h1 class="text-center font-semibold"><span class="text-gray-700">3/4</span> Load Criteria</h1>
            <h1 class=" mt-1 text-center font-semibold text-xs text-gray-600">Enter the following fields</h1>
            <hr class="my-6">
            <div class="mb-2"><label for="name" class=" w-36 inline-block text-xs pr-4">Snow Load (PSF)</label><input id="snow_field" type="text" name="name" class=" inline w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="email" class=" w-36 inline-block text-xs pr-4">Wind Speed (MPH) *optional</label><input id="wind_field" type="text" name="email" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <!-- <div class="mb-2"><label for="phone" class=" w-36 inline-block text-xs pr-4">sdflksdlfkj</label><input type="text" name="phone" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div> -->
            <div class="h-8">
                <input id="next-3" type="button" value="Next" class="bg-gray-700 text-white tracking-wide font-semibold rounded-md py-1 px-4 hover:bg-gray-900 float-right cursor-pointer">
                <input id="prev-3" type="button" value="Back" class="bg-gray-400 text-white tracking-wide font-semibold rounded-md py-1 px-4 hover:bg-gray-700 float-right mr-3 cursor-pointer">
            </div>
        </div>
        <div class="bg-white mt-10 rounded-md shadow-lg max-w-xl mx-auto pt-6 pb-3 px-4" id="dc-4" hidden>
            <h1 class="text-center font-semibold"><span class="text-gray-700">4/4</span> Truss Design Criteria</h1>
            <h1 class=" mt-1 text-center font-semibold text-xs text-gray-600">Enter the following fields</h1>
            <hr class="my-6">
            <div class="mb-2"><label for="name" class=" w-36 inline-block text-xs pr-4">Span</label><input id="span_field" type="text" name="name" class=" inline w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="email" class=" w-36 inline-block text-xs pr-4">Pitch</label><input id="pitch_field" type="text" name="email" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="email" class=" w-36 inline-block text-xs pr-4">Spacing</label><input id="spacing_field" type="text" name="email" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>
            <div class="mb-2"><label for="email" class=" w-36 inline-block text-xs pr-4">Heel Height</label><input id="heel_field" type="text" name="email" class=" w-44 p-1 text-xs bg-gray-50 rounded-sm shadow-sm border-2"></div>            <div class="h-8">
                <input id="next-4" type="button" value="Next" class="bg-gray-700 text-white tracking-wide font-semibold rounded-md py-1 px-4 hover:bg-gray-900 float-right cursor-pointer">
                <input id="prev-4" type="button" value="Back" class="bg-gray-400 text-white tracking-wide font-semibold rounded-md py-1 px-4 hover:bg-gray-700 float-right mr-3 cursor-pointer">
            </div>
        </div>
        
    </div>
@endsection