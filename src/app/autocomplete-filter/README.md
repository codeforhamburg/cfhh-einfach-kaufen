 ## autocomplete
 from a list of objects.
 
 uses: https://github.com/ng2-ui/auto-complete

  public dataSource = zu filterndes Array
  public searchTerm = nach welchem Key gefiltert werden soll;


@FutureTobi:
  warum?! muss "import { NguiAutoCompleteModule } from '@ngui/auto-complete';" und "imports:[NguiAutoCompleteModulein"] app.modules sein,
  aber nicht - wie erwartet - irgendwo in der "autocomplete-filter.component.ts"?
  kann ich einen solchen Import in nur einer Component handeln, ohne sie in einem Modul laden zu müssen?