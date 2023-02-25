<template>
  <p>{{maintCalendar}}</p>
</template>

<script>
import {CalendarService} from "@/services/CalendarService";

export default {
  name: "CalendarPanel",
  data(){
    return {
      maintCalendar: {}
    }
  },
  mounted() {
    this.getMaintCalendar();
  },
  methods:{
    getMaintCalendar() {
      CalendarService.getCarsYearMaintCalendar().then(res => {
        this.maintCalendar = res.calendar;
      });
    }
  }
}
</script>

<style scoped>

</style>