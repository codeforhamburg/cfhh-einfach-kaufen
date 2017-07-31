# DropdownFilterComponent

Takes an array of objects as `dataSource`, and filters items on input. <br>
`filterOnValue` is the key of the dataSource objects to filter on. <br>
Emits the selected item to the `dropDownFilterService` observable;

<br>

## how to use
### _app.component.html:_
```
<wbc-dropdown-filter></wbc-dropdown-filter>
```

#### _app.module.ts:_
```
  import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
  import { DropdownFilterService } from "./dropdown-filter/dropdown-filter.service"
  import { FormsModule } from '@angular/forms';
```
(* `FormsModule` is needed for ngModel)
```
@NgModule({
  declarations: [
    DropdownFilterComponent
  ],
  imports: [
    FormsModule
  ]
})
```
```
providers: [DropdownFilterService],
```
don't forget to add `dropdownFilter_noMatchFoundText` to your i18n translation:
```
{"dropdownFilter_noMatchFoundText" : "no results"}
```

<br>

## service usage
  ```
    import { DropdownFilterService } from "../dropdown-filter/dropdown-filter.service";
  ```
  ```
    constructor(private dropDownFilterService: DropdownFilterService ) { }
  ```
  ```
    dropDownFilterService.getData().subscribe(data => {
        console.log(data);
    }, err => console.log(err));
  ```
