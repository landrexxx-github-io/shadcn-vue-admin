<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import Button from '@/components/ui/button/Button.vue'
import Select from '@/components/ui/select/Select.vue'
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/components/ui/select/SelectValue.vue'
import SelectContent from '@/components/ui/select/SelectContent.vue'
import SelectGroup from '@/components/ui/select/SelectGroup.vue'
import SelectLabel from '@/components/ui/select/SelectLabel.vue'
import SelectItem from '@/components/ui/select/SelectItem.vue'
import InputSearch from '@/components/custom/InputSearch.vue'
</script>

<template>
  <div class="grid w-full max-w-sm gap-2">
    <InputSearch />
    <InputSearch />
    <Input />
    <Textarea></Textarea>
    <Button>Submit</Button>
    <Select class="w-full">
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent class="w-full">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple"> Apple </SelectItem>
          <SelectItem value="banana"> Banana </SelectItem>
          <SelectItem value="blueberry"> Blueberry </SelectItem>
          <SelectItem value="grapes"> Grapes </SelectItem>
          <SelectItem value="pineapple"> Pineapple </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
