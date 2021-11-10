# Requirements

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [PostgreSQL] - database sql

# Installation

```
cd ./folder
npm install
npm start / npm dev
check http://localhost:5000/region/province
```
# documentation

## Provinsi

```
params = {
    name: 'optional'
}
```

## Kota / Kabupaten

```
params = {
    province_id : 'optional',
    name        : 'optional'
}
```

## Kecamatan

```
params = {
    regency_id  : 'optional',
    name        : 'optional'
}
```

## Desa

```
params = {
    district_id : 'optional',
    name        : 'optional'
}
```

## response success

```
Provinsi
{
    "status" : true,
    "code" : 200,
    "message" : "GET Success",
    "data" : [
        { "id" : "32" , "name" : "JAWA BARAT" },
        { "id" : "35" , "name" : "JAWA TIMUR" },
        ...//
    ]
}
Kota / Kabupaten
{
    "status" : true,
    "code" : 200,
    "message" : "GET Success",
    "data" : [
        { "id" : "1101" , "province_id" : "11" , "name" : "KABUPATEN SIMEULUE" },
        { "id" : "1102" , "province_id" : "11" , "name" : "KABUPATEN ACEH SINGKIL" }
        ...//
    ]
}
Kecamatan
{
    "status" : true,
    "code" : 200,
    "message" : "GET Success",
    "data" : [
        { "id" : "1101010" , "regency_id" : "1101" , "name" : "TEUPAH SELATAN" },
        { "id" : "1101020" , "regency_id" : "1101" , "name" : "SIMEULUE TIMUR" }
        ...//
    ]
}
Desa
{
    "status" : true,
    "code" : 200,
    "message" : "GET Success",
    "data" : [
        { "id" : "1101010" , "district_id" : "1101" , "name" : "LATIUNG" },
        ...//
    ]
}
```

## response error

```
Service not found
{ 
    "status" : false,
    "code" : 404,
    "message" : "Service Not Found"
}
Service Error
{ 
    "status" : false,
    "code" : 500,
    "message" : "Internal Server Error"
}
```