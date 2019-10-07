
const url = 'http://localhost/backend/api/TipoTarea';
const app = new Vue({
    el: '#app',
    data: {
        Tipos: [],
        Nombre: 'Api-Vue JS ',
        titulo: '',
        id_tipo_tarea: '',
        Editar: false 
    },
    mounted() {
        this.Get_Tipos()
    },
    methods: {
        async Get_Tipos() {
            const response = await fetch(url)
            const myJson = await response.json();
            this.Tipos = myJson;
        },
        async Delete_Tipos(id) {
            const response = await fetch(url + "/" + id, {
                method: 'DELETE'
            });
            this.Get_Tipos();
        },
        Limpiar() {
            this.$refs.id.value = '';
            this.$refs.titulo.value = '';
            this.$refs.descripcion.value = '';
        },
        async Post_Tipo(e) {
            event.preventDefault(); //evito la recarga al enviar
            if (!this.Editar) {
                //para mandar por form data a la api
                const data = new FormData();
                data.append('nombre', this.$refs.titulo.value); //agrego la clave valor y el valor
                data.append('descripcion', this.$refs.descripcion.value);
                const response = await fetch(url, {
                    method: 'POST',
                    body: data
                })
            } else if (this.Editar === true) {
                //para mandar por form data a la api
                var data = JSON.stringify({
                    "nombre": this.$refs.titulo.value,
                    "descripcion":this.$refs.descripcion.value
                })
                console.log(data)
                console.log(this.$refs.id.value)
                const response = await fetch(url+'/'+this.$refs.id.value, {
                    method: 'PUT',
                    body: data,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            }
            //para no recargar
            this.Editar = false;
            this.Get_Tipos();
            this.Limpiar();
        },
        async Update_Tipos(id) {
            const response = await fetch(url + "/" + id)
            const myJson = await response.json();
            await console.log(myJson)
            this.$refs.id.value = myJson[0].id_tipo_tarea;
            this.$refs.titulo.value = myJson[0].nombre;
            this.$refs.descripcion.value = myJson[0].descripcion;
            this.Editar = true;
            console.log(this.Editar)
        }
    }
})
